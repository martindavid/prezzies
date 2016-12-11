/**
 * GET /
 */
exports.index = function(req, res) {
  res.render('checkout', {
    title: 'Checkout'
  });
};


exports.checkoutSuccess = function(req, res) {
  res.render('checkout-success', {
    title: 'Order Success'
  });
};