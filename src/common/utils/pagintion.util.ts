import { PaginationDto } from "../dtos/pagination.dto";

export function PagitionSolver(paginationDto:PaginationDto){
  let {limit=0,page=0}=paginationDto
  if(!page||page<=1) page=0
  else page=page-1
  if(!limit || limit <=0 ) limit=10
  let skip=page*limit;
  return{
    page:page === 0 ? 1 :page,
    limit,
    skip
  }
}

export function PagitionGeneritor(page:number=0,limit:number=0,count:number=0){
  return{
    totalCount:count,
    page:+page,
    limit:+limit,
    pageCount:Math.ceil(count/limit)
  }
}