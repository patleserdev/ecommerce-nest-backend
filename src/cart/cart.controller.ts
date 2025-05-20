import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto.js';
import { UpdateCartItemDto } from './dto/update-cart-item.dto.js';
import { Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

interface UserPayload {
  id: number;
  // ... autres props si besoin
}

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  @ApiOperation({ summary: 'Ajouter un panier' })
  @ApiBody({ type: CreateCartItemDto })
  addItem(@Req() req: Request, @Body() createCartItemDto: CreateCartItemDto) {
    if (!req.user) {
      throw new UnauthorizedException('User not authenticated');
    }

    const userId = (req.user as UserPayload).id;

    return this.cartService.addItem(userId, createCartItemDto);
  }

  @Patch('update/:itemId')
  @ApiOperation({ summary: 'Modifier un panier' })
  @ApiBody({ type: UpdateCartItemDto })
  updateItem(
    @Req() req: Request,
    @Param('itemId') itemId: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    const userId = (req.user as UserPayload).id;
    return this.cartService.updateItem(userId, itemId, updateCartItemDto);
  }

  @Delete('remove/:itemId')
  @ApiOperation({ summary: 'Supprimer un panier' })
  removeItem(@Req() req: Request, @Param('itemId') itemId: number) {
    const userId = (req.user as UserPayload).id;
    return this.cartService.removeItem(userId, itemId);
  }

  @Get('summary')
  @ApiOperation({ summary: 'Récupérer un panier' })
  getCartSummary(@Req() req: Request) {
    const userId = (req.user as UserPayload).id;
    return this.cartService.getCartSummary(userId);
  }

  @Post('checkout')
  @ApiOperation({ summary: 'Valider un panier' })
  async checkout(@Req() req: Request) {
    const userId = (req.user as UserPayload).id;
    await this.cartService.getCartSummary(userId);
    // Integrate the order placement and payment here
    await this.cartService.clearCart(userId);
    return { message: 'Checkout successful' };
  }
}
