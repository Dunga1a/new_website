"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply = exports.OrganizeMembershipTitle = exports.NewsPost = exports.NewsCategory = exports.Member = exports.Event = exports.Contact = exports.Comment = exports.BusinessAreas = exports.Role = exports.User = void 0;
const BusinessAreas_1 = require("./entities/BusinessAreas");
Object.defineProperty(exports, "BusinessAreas", { enumerable: true, get: function () { return BusinessAreas_1.BusinessAreas; } });
const Comment_1 = require("./entities/Comment");
Object.defineProperty(exports, "Comment", { enumerable: true, get: function () { return Comment_1.Comment; } });
const Contact_1 = require("./entities/Contact");
Object.defineProperty(exports, "Contact", { enumerable: true, get: function () { return Contact_1.Contact; } });
const Members_1 = require("./entities/Members");
Object.defineProperty(exports, "Member", { enumerable: true, get: function () { return Members_1.Member; } });
const NewsCategory_1 = require("./entities/NewsCategory");
Object.defineProperty(exports, "NewsCategory", { enumerable: true, get: function () { return NewsCategory_1.NewsCategory; } });
const NewsPost_1 = require("./entities/NewsPost");
Object.defineProperty(exports, "NewsPost", { enumerable: true, get: function () { return NewsPost_1.NewsPost; } });
const OrganizeMembershipTitle_1 = require("./entities/OrganizeMembershipTitle");
Object.defineProperty(exports, "OrganizeMembershipTitle", { enumerable: true, get: function () { return OrganizeMembershipTitle_1.OrganizeMembershipTitle; } });
const Reply_1 = require("./entities/Reply");
Object.defineProperty(exports, "Reply", { enumerable: true, get: function () { return Reply_1.Reply; } });
const Role_1 = require("./entities/Role");
Object.defineProperty(exports, "Role", { enumerable: true, get: function () { return Role_1.Role; } });
const User_1 = require("./entities/User");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return User_1.User; } });
const Event_1 = require("./entities/Event");
Object.defineProperty(exports, "Event", { enumerable: true, get: function () { return Event_1.Event; } });
const entities = [
    User_1.User,
    Role_1.Role,
    BusinessAreas_1.BusinessAreas,
    Comment_1.Comment,
    Contact_1.Contact,
    Event_1.Event,
    Members_1.Member,
    NewsCategory_1.NewsCategory,
    NewsPost_1.NewsPost,
    OrganizeMembershipTitle_1.OrganizeMembershipTitle,
    Reply_1.Reply,
];
exports.default = entities;
//# sourceMappingURL=index.js.map