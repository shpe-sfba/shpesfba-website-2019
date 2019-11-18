module.exports = function(data, options) {
  var theString = data.substring(0, 150);
  return new Handlebars.SafeString(theString + "...");
};
