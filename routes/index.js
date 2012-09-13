/**
 * Index routes.
 */
var index = {};

index.index = function(req, res) {
    res.render('index', {});
};

exports.index = index;
