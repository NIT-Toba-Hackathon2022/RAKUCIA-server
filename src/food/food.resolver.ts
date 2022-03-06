import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Food } from './food.model';
import { FoodService } from './food.service';
import { FoodCreateInput } from './food.input';

@Resolver()
export class FoodResolver {
  constructor(private readonly foodService: FoodService) {}
  // これはデバッグ用です
  @Query(() => [Food], { name: 'foods' })
  findAll(): Promise<Food[]> {
    return this.foodService.findAll();
  }

  @Query(() => [Food], { name: 'createList' })
  createList(@Args('user_id') user_id: string): Promise<Food[]> {
    return this.foodService.createList(user_id);
  }

  @Mutation(() => Food, { name: 'addFood' })
  addFood(@Args('food_data') food_data: FoodCreateInput): Promise<Food> {
    return this.foodService.addFood(food_data);
  }

  @Mutation(() => Food, { name: 'updateFood' })
  updateFood(
    @Args('id') id: number,
    @Args('add_to_list') add_to_list: number,
    @Args('leave_flag') leave_flag: number,
  ): Promise<Food> {
    return this.foodService.updateFood(id, add_to_list, leave_flag);
  }

  @Mutation(() => [Food], { name: 'deleteFood' })
  deleteFood(@Args('user_id') user_id: string): Promise<Promise<Food>[]> {
    return this.foodService.deleteFood(user_id);
  }
}
