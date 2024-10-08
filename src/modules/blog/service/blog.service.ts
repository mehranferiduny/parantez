import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  Scope,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BlogEntity } from "../entities/blog.entity";
import { DataSource, FindOptionsWhere, Repository } from "typeorm";
import { CreateBlogDto, FilterBlogDto, UpdeatBlogDto } from "../dto/blog.dto";
import { createSlug, RandumId } from "src/common/utils/functions.util";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { BlogStatus } from "../enums/status.enum";
import {
  BadRequestExceptionMasseage,
  NotFindMassege,
  PublicMassege,
} from "src/common/enums/message.enum";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import {
  PagitionGeneritor,
  PagitionSolver,
} from "src/common/utils/pagintion.util";
import { CategoryService } from "../../category/category.service";
import { isArray, IsArray } from "class-validator";
import { BlogCtaegoryEntity } from "../entities/bolg-category.entity";
import { EntityName } from "src/common/enums/entity.enum";
import { BlogLikeEntity } from "../entities/like.entity";
import { BlogBookmarkEntity } from "../entities/bookmark.entity";
import { BlogCommentService } from "./comment.service";

@Injectable({ scope: Scope.REQUEST })
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogRepository: Repository<BlogEntity>,
    @InjectRepository(BlogCtaegoryEntity)
    private readonly blogCategoryRepository: Repository<BlogCtaegoryEntity>,
    @InjectRepository(BlogLikeEntity)
    private readonly blogLikeRepository: Repository<BlogLikeEntity>,
    @InjectRepository(BlogBookmarkEntity)
    private readonly blogBookmarkRepository: Repository<BlogBookmarkEntity>,
    @Inject(REQUEST) private readonly req: Request,
    private readonly categoryServis: CategoryService,
    private readonly commentServis: BlogCommentService,
    private readonly dataSource: DataSource
  ) {}

  //!Create Blog
  async create(blogDto: CreateBlogDto) {
    let {
      slug,
      title,
      content,
      description,
      image,
      time_for_stady,
      categoris,
    } = blogDto;
    let slugData = slug ?? title;
    slug = createSlug(slugData);

    if (!isArray(categoris) && typeof categoris == "string") {
      categoris = categoris.split(",");
    } else if (!isArray(categoris)) {
      throw new BadRequestException(
        BadRequestExceptionMasseage.InValidCategoryData
      );
    }

    const user = this.req.user;

    const ExistSlug = await this.checkSlugUnic(slug);
    if (ExistSlug) {
      slug += `-${RandumId()}`;
    }

    let Blog = this.blogRepository.create({
      title,
      description,
      slug,
      content,
      time_for_stady,
      image,
      authorId: user.id,
      status: BlogStatus.Draft,
    });
    Blog = await this.blogRepository.save(Blog);

    for (const categoryTitle of categoris) {
      let category = await this.categoryServis.findOneByTitle(categoryTitle);
      if (!category) {
        category = await this.categoryServis.InsertByTitle(categoryTitle);
      }

      await this.blogCategoryRepository.insert({
        blogId: Blog.id,
        categoryId: category.id,
      });
    }

    return {
      message: PublicMassege.Creaeted,
    };
  }

  //! Check Unic Slug
  async checkSlugUnic(slug: string) {
    const Blog = await this.blogRepository.findOneBy({ slug });
    return Blog;
  }

  //!Get My Blog
  async myBlog() {
    const { id } = this.req.user;
    return this.blogRepository.find({
      where: {
        authorId: id,
      },
      order: {
        id: "DESC",
      },
    });
  }

  //!Get Blog List
  async blogList(pagintinDto: PaginationDto, filterDto: FilterBlogDto) {
    const { limit, page, skip } = PagitionSolver(pagintinDto);
    let { category, search } = filterDto;

    // let where:FindOptionsWhere<BlogEntity>={}
    let where = "";

    if (category) {
      //  where['category']={
      //   category:{
      //     title:category
      //   }
      //  }

      category = category.toLowerCase();
      if (where.length > 0) where += " AND ";
      where += "category.title = LOWER(:category)";
      console.log(where);
    }
    if (search) {
      if (where.length > 0) where += " AND ";

      search = `%${search}%`;
      where +=
        "CONCAT(blog.title , blog.content , blog.description) ILIKE :search";
    }

    const [blogs, count] = await this.blogRepository
      .createQueryBuilder(EntityName.Blog)
      .leftJoin("blog.categoris", "categoris")
      .leftJoin("categoris.category", "category")
      .leftJoin("blog.author", "auther")
      .leftJoin("auther.profile", "profile")
      .addSelect([
        "categoris.id",
        "category.title",
        "auther.username",
        "auther.id",
        "profile.nik_name",
      ])
      .where(where, { category, search })
      .loadRelationCountAndMap("blog.likes", "blog.likes")
      .loadRelationCountAndMap("blog.bookmark", "blog.bookmark")
      .loadRelationCountAndMap(
        "blog.comment",
        "blog.comment",
        "comment",
        (qb) => qb.where("comment.acseped = :acseped", { acseped: true })
      )
      .orderBy("blog.id", "DESC")
      .take(limit)
      .skip(skip)
      .getManyAndCount();

    // const[blogs,count]=await this.blogRepository.findAndCount({
    //   relations:{
    //    categoris:{
    //     category:true
    //    }
    //   },
    //   where:{},
    //   select:{
    //     categoris:{
    //       id:true,

    //       category:
    //       {

    //         title:true
    //       }

    //   }},
    //   order:{
    //     id:"DESC"
    //   },
    //   skip,
    //   take:limit

    // })
    return {
      pagination: PagitionGeneritor(page, limit, count),
      blogs,
    };
  }

  //! Delete Blog
  async delete(id: number) {
    await this.checkExistBlogById(id);
    await this.blogRepository.delete({ id });
    return {
      message: PublicMassege.Deleted,
    };
  }

  //! Check Exist Blog By Id
  async checkExistBlogById(id: number) {
    const blog = await this.blogRepository.findOneBy({ id });
    if (!blog) throw new NotFoundException(NotFindMassege.NotPost);
    return blog;
  }

  //!Update Blog
  async update(id: number, blogDto: UpdeatBlogDto) {
    const user = this.req.user;
    let {
      slug,
      title,
      content,
      description,
      image,
      time_for_stady,
      categoris,
    } = blogDto;
    const blog = await this.checkExistBlogById(id);
    if (!isArray(categoris) && typeof categoris == "string") {
      categoris = categoris.split(",");
    } else if (!isArray(categoris)) {
      throw new BadRequestException(
        BadRequestExceptionMasseage.InValidCategoryData
      );
    }
    let slugData = null;
    if (title) {
      blog.title = title;
      slugData = title;
    }
    if (slug) {
      slugData = slug;
    }
    if (slugData) {
      slug = createSlug(slugData);
      const ExistSlug = await this.checkSlugUnic(slug);
      if (ExistSlug && ExistSlug.id !== id) {
        slug += `-${RandumId()}`;
      }

      blog.slug = slug;
    }
    if (description) blog.description = description;
    if (content) blog.content = content;
    if (image) blog.image = image;
    if (time_for_stady) blog.time_for_stady = time_for_stady;
    await this.blogRepository.save(blog);
    await this.blogCategoryRepository.delete({ blogId: blog.id });
    for (const categoryTitle of categoris) {
      let category = await this.categoryServis.findOneByTitle(categoryTitle);
      if (!category) {
        category = await this.categoryServis.InsertByTitle(categoryTitle);
      }

      await this.blogCategoryRepository.insert({
        blogId: blog.id,
        categoryId: category.id,
      });
    }

    return {
      message: PublicMassege.Updaeted,
    };
  }

  //!Bookmark Blog
  async bookmarkToggel(blogId: number) {
    const { id: userId } = this.req.user;
    await this.checkExistBlogById(blogId);
    const isBookmark = await this.blogBookmarkRepository.findOneBy({
      userId,
      blogId,
    });

    let massege = PublicMassege.Bookmark;
    if (isBookmark) {
      await this.blogBookmarkRepository.delete({ id: isBookmark.id });
      massege = PublicMassege.UnBookmark;
    } else {
      await this.blogBookmarkRepository.insert({ blogId, userId });
    }
    return { massege };
  }

  //!Like Blog
  async likeToggel(blogId: number) {
    const { id: userId } = this.req.user;
    await this.checkExistBlogById(blogId);
    const isLiked = await this.blogLikeRepository.findOneBy({ userId, blogId });

    let massege = PublicMassege.Like;
    if (isLiked) {
      await this.blogLikeRepository.delete({ id: isLiked.id });
      massege = PublicMassege.Dislike;
    } else {
      await this.blogLikeRepository.insert({ blogId, userId });
    }
    return { massege };
  }

  async findOneBySlug(pagintinDto: PaginationDto, slug: string) {
    const userId = this.req?.user?.id;
    const blog = await this.blogRepository
      .createQueryBuilder(EntityName.Blog)
      .leftJoin("blog.categoris", "categoris")
      .leftJoin("categoris.category", "category")
      .leftJoin("blog.author", "auther")
      .leftJoin("auther.profile", "profile")
      .addSelect([
        "categoris.id",
        "category.title",
        "auther.username",
        "auther.id",
        "profile.nik_name",
      ])
      .where({ slug })
      .loadRelationCountAndMap("blog.likes", "blog.likes")
      .loadRelationCountAndMap("blog.bookmark", "blog.bookmark")
      .getOne();

    if (!blog) throw new NotFoundException(NotFindMassege.NotPost);
    const commentData = await this.commentServis.findCommentsOfBlog(
      pagintinDto,
      blog.id
    );

    let isLiked = false;
    let isBookmarked = false;

    if (userId && !isNaN(userId) && userId > 0) {
      isLiked = !!(await this.blogLikeRepository.findOneBy({
        userId,
        blogId: blog.id,
      }));
      isBookmarked = !!(await this.blogBookmarkRepository.findOneBy({
        userId,
        blogId: blog.id,
      }));
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    const suggestBlogs = await queryRunner.query(`
        WITH suggested_blogs AS (
            SELECT 
                    blog.id,
                    blog.slug,
                    blog.title,
                    blog.description,
                    blog.time_for_stady,
                    blog.image,
                     json_build_object(
                        'username', u.username,
                        'author_name', p.nik_name,
                        'image', p.imag_profile
                    ) AS author,
                    array_agg(DISTINCT cat.title) AS category,
                      (
                        SELECT COUNT(*) FROM blog_likes
                        WHERE blog_likes."blogId" = blog.id
                    ) AS likes,
                    (
                        SELECT COUNT(*) FROM blog_bookmarks
                        WHERE blog_bookmarks."blogId" = blog.id
                    ) AS bookmarks,
                    (
                        SELECT COUNT(*) FROM blog_comments
                        WHERE blog_comments."blogId" = blog.id
                    ) AS comments
                     

           FROM blog
           LEFT JOIN public.user u ON blog."authorId" = u.id
                LEFT JOIN profile p ON p."userId" = u.id
                LEFT JOIN blog_category bc ON blog.id = bc."blogId"
                LEFT JOIN category cat ON bc."categoryId" = cat.id
                GROUP BY blog.id, u.username, p.nik_name, p.imag_profile
                
            ORDER BY RANDOM()
            LIMIT 3

        )
        SELECT * FROM suggested_blogs
    `);

    return {
      blog,
      isLiked,
      isBookmarked,
      commentData,
      suggestBlogs,
    };
  }
}
