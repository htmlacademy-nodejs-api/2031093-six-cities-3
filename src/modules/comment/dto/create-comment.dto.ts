import { IsMongoId, IsString, Length, IsInt, Min, Max } from 'class-validator';

export default class CreateCommentDto {

  @IsString({message: 'text is required'})
  @Length(5, 1024, {message: 'Comment min length is 5, max is 1024'})
  public text!: string;

  @IsInt({message: 'rating must be an integer'})
  @Min(1, {message: 'Min value for rating is 1'})
  @Max(5, {message: 'Max value for rating is 5'})
  public rating!: number;

  @IsMongoId({message: 'offerId field must be a valid id'})
  public offerId!: string;

  @IsMongoId({message: 'userId field must be a valid id'})
  public userId!: string;
}
