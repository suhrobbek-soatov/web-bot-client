export const totalPrice = arr => arr.reduce((a, b) => a + b.price * b.quantity, 0);
