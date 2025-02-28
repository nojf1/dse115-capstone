import { Request, Response } from 'express';
import { Cart, CartItem } from '../models/cart';
import Product from '../models/products';

// Get cart for a user
export const getCart = async (req: Request, res: Response) => {
  try {
    const memberId = req.user?.id;
    
    // Log debugging information
    console.log("GET /cart accessed by user:", memberId);
    
    // Find or create cart
    const [cart] = await Cart.findOrCreate({
      where: { member_id: memberId },
      defaults: { 
        member_id: memberId,
        total: 0 
      }
    });
    
    // Get cart items with product details
    const cartItems = await CartItem.findAll({
      where: { cart_id: cart.id },
      include: [{
        model: Product,
        attributes: ['id', 'name', 'description', 'price', 'image_url']
      }]
    });
    
    // Transform data to match frontend expectations (Product → product)
    const transformedItems = cartItems.map(item => {
      const plainItem = item.get({ plain: true });
      return {
        ...plainItem,
        product: plainItem.Product, // Copy capitalized to lowercase
        Product: undefined // Remove capitalized version
      };
    });
    
    return res.status(200).json({ 
      cart, 
      items: transformedItems
    });
  } catch (error) {
    console.error("Error in getCart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Modify the addToCart function
export const addToCart = async (req: Request, res: Response) => {
  try {
    const { product_id, quantity = 1 } = req.body;
    const memberId = req.user?.id;
    
    // Validate product exists - use the correct ID field
    const product = await Product.findByPk(product_id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Find or create cart
    const [cart] = await Cart.findOrCreate({
      where: { member_id: memberId },
      defaults: { 
        member_id: memberId,
        total: 0 
      }
    });
    
    // Check if product already in cart
    let cartItem = await CartItem.findOne({
      where: {
        cart_id: cart.id,
        product_id
      }
    });
    
    if (cartItem) {
      // Update quantity
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // Create new cart item
      cartItem = await CartItem.create({
        cart_id: cart.id,
        product_id,
        quantity,
        price: product.price
      });
    }
    
    // Update cart total
    cart.total = await calculateCartTotal(cart.id);
    await cart.save();
    
    return res.status(200).json({ 
      message: 'Product added to cart',
      cart,
      item: cartItem
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    return res.status(500).json({ message: 'Failed to add product to cart' });
  }
};

// Update cart item quantity
export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const item_id = req.params.itemId; // Get from URL parameter instead of body
    const { quantity } = req.body;
    const memberId = req.user?.id;
    
    // Find user's cart
    const cart = await Cart.findOne({
      where: { member_id: memberId }
    });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    // Find cart item
    const cartItem = await CartItem.findOne({
      where: {
        id: item_id,
        cart_id: cart.id
      }
    });
    
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    
    if (quantity <= 0) {
      // Remove item if quantity is zero or negative
      await cartItem.destroy();
    } else {
      // Update quantity
      cartItem.quantity = quantity;
      await cartItem.save();
    }
    
    // Update cart total
    cart.total = await calculateCartTotal(cart.id);
    await cart.save();
    
    return res.status(200).json({ 
      message: 'Cart updated',
      cart
    });
  } catch (error) {
    console.error('Update cart error:', error);
    return res.status(500).json({ message: 'Failed to update cart' });
  }
};

// Remove item from cart
export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.itemId; // Changed from item_id to itemId to match route
    const memberId = req.user?.id;
    
    // Find user's cart
    const cart = await Cart.findOne({
      where: { member_id: memberId }
    });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    // Delete cart item
    const deleted = await CartItem.destroy({
      where: {
        id: itemId, // Now using the correct variable
        cart_id: cart.id
      }
    });
    
    if (!deleted) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    
    // Update cart total
    cart.total = await calculateCartTotal(cart.id);
    await cart.save();
    
    return res.status(200).json({ 
      message: 'Item removed from cart',
      cart
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    return res.status(500).json({ message: 'Failed to remove item from cart' });
  }
};

// Clear cart
export const clearCart = async (req: Request, res: Response) => {
  try {
    const memberId = req.user?.id;
    
    // Find user's cart
    const cart = await Cart.findOne({
      where: { member_id: memberId }
    });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    // Delete all cart items
    await CartItem.destroy({
      where: { cart_id: cart.id }
    });
    
    // Reset cart total
    cart.total = 0;
    await cart.save();
    
    return res.status(200).json({ 
      message: 'Cart cleared',
      cart
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    return res.status(500).json({ message: 'Failed to clear cart' });
  }
};

// Helper function to calculate cart total
const calculateCartTotal = async (cartId: number): Promise<number> => {
  const cartItems = await CartItem.findAll({
    where: { cart_id: cartId },
    include: [{ model: Product }]
  });
  
  return cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
};