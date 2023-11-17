const totalPrice = arr => arr.reduce((a, b) => a + b.price * b.quantity, 0);

const getTitles = arr => {
  const title = arr.map(({ quantity: q, price: p, title: t }, i) => {
    const fPrice = (p * q).toFixed(2);

    return `${++i}. <b>${t}</b> - ${q} ta <b>${p}$</b> ${q > 1 ? `dan <b>${fPrice}$</b>` : ""}`;
  });

  return `<b>Xaridingiz uchun rahmat!</b>\nSotib olgan kurslaringiz:\n\n${title.join("\n")}\n\nJami: <b>${totalPrice(arr).toFixed(2)}$</b>`;
};

module.exports = { getTitles };
