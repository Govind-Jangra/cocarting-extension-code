var DataTypes = require("sequelize").DataTypes;
var _blocked_users = require("./blocked_users");
var _brands = require("./brands");
var _categories_cocarts = require("./categories_cocarts");
var _charities = require("./charities");
var _clipped_coupons = require("./clipped_coupons");
var _cocart_categories = require("./cocart_categories");
var _cocart_likes = require("./cocart_likes");
var _cocart_messages = require("./cocart_messages");
var _cocart_product_downvotes = require("./cocart_product_downvotes");
var _cocart_product_upvotes = require("./cocart_product_upvotes");
var _cocart_product_user_statuses = require("./cocart_product_user_statuses");
var _cocart_products = require("./cocart_products");
var _cocart_shares = require("./cocart_shares");
var _cocart_users = require("./cocart_users");
var _cocarts = require("./cocarts");
var _compare = require("./compare");
var _contact_forms = require("./contact_forms");
var _contacts = require("./contacts");
var _coupon = require("./coupon");
var _coupon_redeems = require("./coupon_redeems");
var _failed_jobs = require("./failed_jobs");
var _faq_sections = require("./faq_sections");
var _friends = require("./friends");
var _giftcards = require("./giftcards");
var _help_sections = require("./help_sections");
var _hidden_posts = require("./hidden_posts");
var _jobs = require("./jobs");
var _loyalty_tasks = require("./loyalty_tasks");
var _migrations = require("./migrations");
var _newsletter = require("./newsletter");
var _newsletters = require("./newsletters");
var _notification_preferences = require("./notification_preferences");
var _notifications = require("./notifications");
var _organizations = require("./organizations");
var _password_reset_tokens = require("./password_reset_tokens");
var _password_resets = require("./password_resets");
var _personal_access_tokens = require("./personal_access_tokens");
var _poll_options = require("./poll_options");
var _poll_votes = require("./poll_votes");
var _polls = require("./polls");
var _post_comments = require("./post_comments");
var _post_likes = require("./post_likes");
var _posts = require("./posts");
var _product_attributes = require("./product_attributes");
var _product_categories = require("./product_categories");
var _product_favorites = require("./product_favorites");
var _product_images = require("./product_images");
var _product_reviews = require("./product_reviews");
var _product_scraping_templates = require("./product_scraping_templates");
var _products = require("./products");
var _reports = require("./reports");
var _retailers = require("./retailers");
var _save_sharing_products = require("./save_sharing_products");
var _social_accounts = require("./social_accounts");
var _tasks = require("./tasks");
var _tips_and_tricks = require("./tips_and_tricks");
var _user_favorite_brands_retailers = require("./user_favorite_brands_retailers");
var _user_invites = require("./user_invites");
var _user_loyalty = require("./user_loyalty");
var _users = require("./users");

function initModels(sequelize) {
  var blocked_users = _blocked_users(sequelize, DataTypes);
  var brands = _brands(sequelize, DataTypes);
  var categories_cocarts = _categories_cocarts(sequelize, DataTypes);
  var charities = _charities(sequelize, DataTypes);
  var clipped_coupons = _clipped_coupons(sequelize, DataTypes);
  var cocart_categories = _cocart_categories(sequelize, DataTypes);
  var cocart_likes = _cocart_likes(sequelize, DataTypes);
  var cocart_messages = _cocart_messages(sequelize, DataTypes);
  var cocart_product_downvotes = _cocart_product_downvotes(sequelize, DataTypes);
  var cocart_product_upvotes = _cocart_product_upvotes(sequelize, DataTypes);
  var cocart_product_user_statuses = _cocart_product_user_statuses(sequelize, DataTypes);
  var cocart_products = _cocart_products(sequelize, DataTypes);
  var cocart_shares = _cocart_shares(sequelize, DataTypes);
  var cocart_users = _cocart_users(sequelize, DataTypes);
  var cocarts = _cocarts(sequelize, DataTypes);
  var compare = _compare(sequelize, DataTypes);
  var contact_forms = _contact_forms(sequelize, DataTypes);
  var contacts = _contacts(sequelize, DataTypes);
  var coupon = _coupon(sequelize, DataTypes);
  var coupon_redeems = _coupon_redeems(sequelize, DataTypes);
  var failed_jobs = _failed_jobs(sequelize, DataTypes);
  var faq_sections = _faq_sections(sequelize, DataTypes);
  var friends = _friends(sequelize, DataTypes);
  var giftcards = _giftcards(sequelize, DataTypes);
  var help_sections = _help_sections(sequelize, DataTypes);
  var hidden_posts = _hidden_posts(sequelize, DataTypes);
  var jobs = _jobs(sequelize, DataTypes);
  var loyalty_tasks = _loyalty_tasks(sequelize, DataTypes);
  var migrations = _migrations(sequelize, DataTypes);
  var newsletter = _newsletter(sequelize, DataTypes);
  var newsletters = _newsletters(sequelize, DataTypes);
  var notification_preferences = _notification_preferences(sequelize, DataTypes);
  var notifications = _notifications(sequelize, DataTypes);
  var organizations = _organizations(sequelize, DataTypes);
  var password_reset_tokens = _password_reset_tokens(sequelize, DataTypes);
  var password_resets = _password_resets(sequelize, DataTypes);
  var personal_access_tokens = _personal_access_tokens(sequelize, DataTypes);
  var poll_options = _poll_options(sequelize, DataTypes);
  var poll_votes = _poll_votes(sequelize, DataTypes);
  var polls = _polls(sequelize, DataTypes);
  var post_comments = _post_comments(sequelize, DataTypes);
  var post_likes = _post_likes(sequelize, DataTypes);
  var posts = _posts(sequelize, DataTypes);
  var product_attributes = _product_attributes(sequelize, DataTypes);
  var product_categories = _product_categories(sequelize, DataTypes);
  var product_favorites = _product_favorites(sequelize, DataTypes);
  var product_images = _product_images(sequelize, DataTypes);
  var product_reviews = _product_reviews(sequelize, DataTypes);
  var product_scraping_templates = _product_scraping_templates(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var reports = _reports(sequelize, DataTypes);
  var retailers = _retailers(sequelize, DataTypes);
  var save_sharing_products = _save_sharing_products(sequelize, DataTypes);
  var social_accounts = _social_accounts(sequelize, DataTypes);
  var tasks = _tasks(sequelize, DataTypes);
  var tips_and_tricks = _tips_and_tricks(sequelize, DataTypes);
  var user_favorite_brands_retailers = _user_favorite_brands_retailers(sequelize, DataTypes);
  var user_invites = _user_invites(sequelize, DataTypes);
  var user_loyalty = _user_loyalty(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  coupon.belongsTo(brands, { as: "brand", foreignKey: "brand_id"});
  brands.hasMany(coupon, { as: "coupons", foreignKey: "brand_id"});
  user_favorite_brands_retailers.belongsTo(brands, { as: "brand", foreignKey: "brand_id"});
  brands.hasMany(user_favorite_brands_retailers, { as: "user_favorite_brands_retailers", foreignKey: "brand_id"});
  cocart_product_downvotes.belongsTo(cocart_products, { as: "cocart_product", foreignKey: "cocart_product_id"});
  cocart_products.hasMany(cocart_product_downvotes, { as: "cocart_product_downvotes", foreignKey: "cocart_product_id"});
  cocart_product_upvotes.belongsTo(cocart_products, { as: "cocart_product", foreignKey: "cocart_product_id"});
  cocart_products.hasMany(cocart_product_upvotes, { as: "cocart_product_upvotes", foreignKey: "cocart_product_id"});
  cocart_product_user_statuses.belongsTo(cocart_products, { as: "cocart_product", foreignKey: "cocart_product_id"});
  cocart_products.hasMany(cocart_product_user_statuses, { as: "cocart_product_user_statuses", foreignKey: "cocart_product_id"});
  cocart_likes.belongsTo(cocarts, { as: "cocart", foreignKey: "cocart_id"});
  cocarts.hasMany(cocart_likes, { as: "cocart_likes", foreignKey: "cocart_id"});
  cocart_messages.belongsTo(cocarts, { as: "cocart", foreignKey: "cocart_id"});
  cocarts.hasMany(cocart_messages, { as: "cocart_messages", foreignKey: "cocart_id"});
  cocart_product_downvotes.belongsTo(cocarts, { as: "cocart", foreignKey: "cocart_id"});
  cocarts.hasMany(cocart_product_downvotes, { as: "cocart_product_downvotes", foreignKey: "cocart_id"});
  cocart_product_upvotes.belongsTo(cocarts, { as: "cocart", foreignKey: "cocart_id"});
  cocarts.hasMany(cocart_product_upvotes, { as: "cocart_product_upvotes", foreignKey: "cocart_id"});
  cocart_product_user_statuses.belongsTo(cocarts, { as: "cocart", foreignKey: "cocart_id"});
  cocarts.hasMany(cocart_product_user_statuses, { as: "cocart_product_user_statuses", foreignKey: "cocart_id"});
  cocart_products.belongsTo(cocarts, { as: "cocart", foreignKey: "cocart_id"});
  cocarts.hasMany(cocart_products, { as: "cocart_products", foreignKey: "cocart_id"});
  cocart_shares.belongsTo(cocarts, { as: "cocart", foreignKey: "cocart_id"});
  cocarts.hasMany(cocart_shares, { as: "cocart_shares", foreignKey: "cocart_id"});
  cocart_users.belongsTo(cocarts, { as: "cocart", foreignKey: "cocart_id"});
  cocarts.hasMany(cocart_users, { as: "cocart_users", foreignKey: "cocart_id"});
  coupon_redeems.belongsTo(cocarts, { as: "cocart", foreignKey: "cocart_id"});
  cocarts.hasMany(coupon_redeems, { as: "coupon_redeems", foreignKey: "cocart_id"});
  notifications.belongsTo(cocarts, { as: "cocart", foreignKey: "cocart_id"});
  cocarts.hasMany(notifications, { as: "notifications", foreignKey: "cocart_id"});
  product_attributes.belongsTo(cocarts, { as: "cocart", foreignKey: "cocart_id"});
  cocarts.hasMany(product_attributes, { as: "product_attributes", foreignKey: "cocart_id"});
  product_favorites.belongsTo(cocarts, { as: "cocart", foreignKey: "cocart_id"});
  cocarts.hasMany(product_favorites, { as: "product_favorites", foreignKey: "cocart_id"});
  clipped_coupons.belongsTo(coupon, { as: "coupon", foreignKey: "coupon_id"});
  coupon.hasMany(clipped_coupons, { as: "clipped_coupons", foreignKey: "coupon_id"});
  coupon_redeems.belongsTo(coupons, { as: "coupon", foreignKey: "coupon_id"});
  coupons.hasMany(coupon_redeems, { as: "coupon_redeems", foreignKey: "coupon_id"});
  giftcards.belongsTo(loyalty_tasks, { as: "loyalty_task", foreignKey: "loyalty_task_id"});
  loyalty_tasks.hasMany(giftcards, { as: "giftcards", foreignKey: "loyalty_task_id"});
  user_loyalty.belongsTo(loyalty_tasks, { as: "loyalty", foreignKey: "loyalty_id"});
  loyalty_tasks.hasMany(user_loyalty, { as: "user_loyalties", foreignKey: "loyalty_id"});
  poll_votes.belongsTo(poll_options, { as: "poll_option", foreignKey: "poll_option_id"});
  poll_options.hasMany(poll_votes, { as: "poll_votes", foreignKey: "poll_option_id"});
  poll_options.belongsTo(polls, { as: "poll", foreignKey: "poll_id"});
  polls.hasMany(poll_options, { as: "poll_options", foreignKey: "poll_id"});
  hidden_posts.belongsTo(posts, { as: "post", foreignKey: "post_id"});
  posts.hasMany(hidden_posts, { as: "hidden_posts", foreignKey: "post_id"});
  post_comments.belongsTo(posts, { as: "post", foreignKey: "post_id"});
  posts.hasMany(post_comments, { as: "post_comments", foreignKey: "post_id"});
  post_likes.belongsTo(posts, { as: "post", foreignKey: "post_id"});
  posts.hasMany(post_likes, { as: "post_likes", foreignKey: "post_id"});
  posts.belongsTo(posts, { as: "reposted_post", foreignKey: "reposted_post_id"});
  posts.hasMany(posts, { as: "posts", foreignKey: "reposted_post_id"});
  reports.belongsTo(posts, { as: "reported_post", foreignKey: "reported_post_id"});
  posts.hasMany(reports, { as: "reports", foreignKey: "reported_post_id"});
  product_categories.belongsTo(product_categories, { as: "product_category", foreignKey: "product_category_id"});
  product_categories.hasMany(product_categories, { as: "product_category_product_categories", foreignKey: "product_category_id"});
  products.belongsTo(product_categories, { as: "product_category", foreignKey: "product_category_id"});
  product_categories.hasMany(products, { as: "products", foreignKey: "product_category_id"});
  products.belongsTo(product_images, { as: "product_image", foreignKey: "product_image_id"});
  product_images.hasMany(products, { as: "products", foreignKey: "product_image_id"});
  cocart_messages.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(cocart_messages, { as: "cocart_messages", foreignKey: "product_id"});
  cocart_product_downvotes.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(cocart_product_downvotes, { as: "cocart_product_downvotes", foreignKey: "product_id"});
  cocart_product_upvotes.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(cocart_product_upvotes, { as: "cocart_product_upvotes", foreignKey: "product_id"});
  cocart_products.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(cocart_products, { as: "cocart_products", foreignKey: "product_id"});
  compare.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(compare, { as: "compares", foreignKey: "product_id"});
  notifications.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(notifications, { as: "notifications", foreignKey: "product_id"});
  product_favorites.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(product_favorites, { as: "product_favorites", foreignKey: "product_id"});
  product_reviews.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(product_reviews, { as: "product_reviews", foreignKey: "product_id"});
  user_favorite_brands_retailers.belongsTo(retailers, { as: "retailer", foreignKey: "retailer_id"});
  retailers.hasMany(user_favorite_brands_retailers, { as: "user_favorite_brands_retailers", foreignKey: "retailer_id"});
  blocked_users.belongsTo(users, { as: "blocked_user", foreignKey: "blocked_user_id"});
  users.hasMany(blocked_users, { as: "blocked_users", foreignKey: "blocked_user_id"});
  blocked_users.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(blocked_users, { as: "user_blocked_users", foreignKey: "user_id"});
  clipped_coupons.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(clipped_coupons, { as: "clipped_coupons", foreignKey: "user_id"});
  cocart_likes.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(cocart_likes, { as: "cocart_likes", foreignKey: "user_id"});
  cocart_messages.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(cocart_messages, { as: "cocart_messages", foreignKey: "user_id"});
  cocart_product_downvotes.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(cocart_product_downvotes, { as: "cocart_product_downvotes", foreignKey: "user_id"});
  cocart_product_upvotes.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(cocart_product_upvotes, { as: "cocart_product_upvotes", foreignKey: "user_id"});
  cocart_product_user_statuses.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(cocart_product_user_statuses, { as: "cocart_product_user_statuses", foreignKey: "user_id"});
  cocart_products.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(cocart_products, { as: "cocart_products", foreignKey: "user_id"});
  cocart_shares.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(cocart_shares, { as: "cocart_shares", foreignKey: "user_id"});
  cocart_users.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(cocart_users, { as: "cocart_users", foreignKey: "user_id"});
  cocarts.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(cocarts, { as: "cocarts", foreignKey: "user_id"});
  compare.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(compare, { as: "compares", foreignKey: "user_id"});
  contact_forms.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(contact_forms, { as: "contact_forms", foreignKey: "user_id"});
  contacts.belongsTo(users, { as: "user_contact", foreignKey: "user_contact_id"});
  users.hasMany(contacts, { as: "contacts", foreignKey: "user_contact_id"});
  contacts.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(contacts, { as: "user_contacts", foreignKey: "user_id"});
  coupon_redeems.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(coupon_redeems, { as: "coupon_redeems", foreignKey: "user_id"});
  friends.belongsTo(users, { as: "friend", foreignKey: "friend_id"});
  users.hasMany(friends, { as: "friends", foreignKey: "friend_id"});
  friends.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(friends, { as: "user_friends", foreignKey: "user_id"});
  hidden_posts.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(hidden_posts, { as: "hidden_posts", foreignKey: "user_id"});
  notification_preferences.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(notification_preferences, { as: "notification_preferences", foreignKey: "user_id"});
  notifications.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(notifications, { as: "notifications", foreignKey: "user_id"});
  notifications.belongsTo(users, { as: "user_notification", foreignKey: "user_notification_id"});
  users.hasMany(notifications, { as: "user_notification_notifications", foreignKey: "user_notification_id"});
  organizations.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(organizations, { as: "organizations", foreignKey: "user_id"});
  poll_votes.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(poll_votes, { as: "poll_votes", foreignKey: "user_id"});
  polls.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(polls, { as: "polls", foreignKey: "user_id"});
  post_comments.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(post_comments, { as: "post_comments", foreignKey: "user_id"});
  post_likes.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(post_likes, { as: "post_likes", foreignKey: "user_id"});
  posts.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(posts, { as: "posts", foreignKey: "user_id"});
  product_favorites.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(product_favorites, { as: "product_favorites", foreignKey: "user_id"});
  product_reviews.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(product_reviews, { as: "product_reviews", foreignKey: "user_id"});
  products.belongsTo(users, { as: "added_by_user", foreignKey: "added_by"});
  users.hasMany(products, { as: "products", foreignKey: "added_by"});
  reports.belongsTo(users, { as: "reported_user", foreignKey: "reported_user_id"});
  users.hasMany(reports, { as: "reports", foreignKey: "reported_user_id"});
  reports.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(reports, { as: "user_reports", foreignKey: "user_id"});
  social_accounts.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(social_accounts, { as: "social_accounts", foreignKey: "user_id"});
  user_favorite_brands_retailers.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_favorite_brands_retailers, { as: "user_favorite_brands_retailers", foreignKey: "user_id"});
  user_loyalty.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_loyalty, { as: "user_loyalties", foreignKey: "user_id"});

  return {
    blocked_users,
    brands,
    categories_cocarts,
    charities,
    clipped_coupons,
    cocart_categories,
    cocart_likes,
    cocart_messages,
    cocart_product_downvotes,
    cocart_product_upvotes,
    cocart_product_user_statuses,
    cocart_products,
    cocart_shares,
    cocart_users,
    cocarts,
    compare,
    contact_forms,
    contacts,
    coupon,
    coupon_redeems,
    failed_jobs,
    faq_sections,
    friends,
    giftcards,
    help_sections,
    hidden_posts,
    jobs,
    loyalty_tasks,
    migrations,
    newsletter,
    newsletters,
    notification_preferences,
    notifications,
    organizations,
    password_reset_tokens,
    password_resets,
    personal_access_tokens,
    poll_options,
    poll_votes,
    polls,
    post_comments,
    post_likes,
    posts,
    product_attributes,
    product_categories,
    product_favorites,
    product_images,
    product_reviews,
    product_scraping_templates,
    products,
    reports,
    retailers,
    save_sharing_products,
    social_accounts,
    tasks,
    tips_and_tricks,
    user_favorite_brands_retailers,
    user_invites,
    user_loyalty,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
