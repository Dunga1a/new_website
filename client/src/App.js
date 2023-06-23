import React from "react";

import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

import Layout from "./Layout";
import HomePage from "./page";
import RssFeeds from "./page/RSS";

import Introduction from "./page/Introduction/Introduction";
import Regulations from "./page/Introduction/Regulations";
import ExCommittee from "./page/Introduction/ExCommittee";
import Solution from "./page/Introduction/Solution";
import Office from "./page/Incorporation/items/Office";
import Incorporation from "./page/Incorporation/Incorporation";

import LoginPage from "./page/login/LoginPage";

import Oganize from "./page/Incorporation/items/Oganize";
import DetailUser from "./page/Incorporation/items/DetailUser";
import SearchPage from "./page/search";

import UserAuth from "./page/login";
import RegisterPage from "./page/login/RegisterPage";
import NotFound from "./page/NotFound";

import NewsPage from "./page/News";
import NewDetail from "./page/News/NewDetail";

import TradePage from "./page/Trade";
import DetailTrade from "./page/Trade/DetailTrade";
import ProjectPage from "./page/ProjectsPage";
import DetailProjectPage from "./page/ProjectsPage/DetailProjectPage";
import ContactPage from "./page/Contact";
import RssDetail from "./page/RSS/RssDetail";
import DetailPost from "./components/Detail";
import FeedbackPage from "./page/Feedback";
import DetailFeedback from "./page/Feedback/DetailFeedback";

import LostPage from "./page/login/LostPage";
import UserEdit from "./page/login/UserEdit";
import Basic from "./page/userInfo/Basic";
import Avatar from "./page/userInfo/Avatar";

import { AuthContext } from "./context/authContext";
import { useContext } from "react";
import Email from "./page/userInfo/Email";
import Password from "./page/userInfo/Password";
import Question from "./page/userInfo/Question";
import TwoStepVeri from "./page/login/TwoStepVeri";
import StartVerify from "./page/userInfo/verify";
import Setup from "./page/userInfo/verify/Setup";
import Group from "./page/userInfo/Group";
import SafeMode from "./page/userInfo/SafeMode";
import UserInfo from "./page/userInfo/UserInfo";
import PageEvents from "./page/Events";
// import Page from "./page/Page";
import Member from "./page/Member";
import MemberDetail from "./page/Member/MemberDetail";
import ListOfExecutives from "./page/Member/ListOfExecutives";
import MembershipBenefits from "./page/Member/MembershipBenefits";
import EventsDetail from "./page/Events/EventsDetail";
import RegisterMember from "./page/Member/RegisterMember";
import ContentDetail from "./page/Detail/ContentDetail";

import HomePageAdmin from "./page/Admin";
import LayoutAdmin from "./Layout/LayoutAdmin";
import RoleManager from "./page/Admin/role/RoleManager";
import CategoryManager from "./page/Admin/category/CategoryManager";
import NewsManager from "./page/Admin/news/NewsManager";
import MemberManager from "./page/Admin/member/MemberManager";
import UserManager from "./page/Admin/user/UserManager";
import EventManager from "./page/Admin/event/EventManager";
import ContactManager from "./page/Admin/contact/ContactManager";
import ContactManagerDetail from "./page/Admin/contact/ContactManagerDetail";
import UserDetail from "./page/Admin/user/UserDetail";
import NewsDetail from "./page/Admin/news/NewsDetail";

import MembersDetail from "./page/Admin/member/MembersDetail";

import BusinessArea from "./page/Admin/businessArea/BusinessArea";
import Organize from "./page/Admin/organizeMembership/Organize";
import NewsMemberManager from "./page/Admin/news/NewsMemberManager";

const prevHref = "/admin";

const AppLayout = ({ currentUser }) => {
  if (currentUser && currentUser.roles.some((item) => item.name === "admin")) {
    return (
      <Routes>
        <Route path="/admin" element={<LayoutAdmin />}>
          {/* Các route và component cho layout của admin */}
          <Route path="" element={<HomePageAdmin />} />
          <Route path={`${prevHref}/role`} element={<RoleManager />} />
          <Route path={`${prevHref}/category`} element={<CategoryManager />} />
          <Route path={`${prevHref}/news`} element={<NewsManager />} />
          <Route
            path={`${prevHref}/business-area`}
            element={<BusinessArea />}
          />
          <Route path={`${prevHref}/member`} element={<MemberManager />} />

          <Route path={`${prevHref}/user`} element={<UserManager />} />
          <Route path={`${prevHref}/event`} element={<EventManager />} />
          <Route path={`${prevHref}/contact`} element={<ContactManager />} />
          <Route
            path={`${prevHref}/contact/:id`}
            element={<ContactManagerDetail />}
          />
          <Route path={`${prevHref}/organize`} element={<Organize />} />

          <Route path={`${prevHref}/user/:id`} element={<UserDetail />} />
          <Route path={`${prevHref}/news/:id`} element={<NewsDetail />} />
          <Route path={`${prevHref}/member/:id`} element={<MembersDetail />} />
        </Route>

        <Route path="/" element={<Layout />}>
          {/* Các route và component cho layout của admin */}
          <Route
            path={`/memberManager/newsPost`}
            element={<NewsMemberManager />}
          />
          <Route path="/feeds" element={<RssFeeds />} />
          <Route path="/feeds/:slug" element={<RssDetail />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/introduction" element={<Introduction />} />
          <Route path="/regulations" element={<Regulations />} />
          <Route path="/exCommittee" element={<ExCommittee />} />
          <Route path="/solution" element={<Solution />} />

          <Route path="/incorporation" element={<Incorporation />} />

          <Route path="/user" element={<UserAuth />}>
            <Route
              path="login"
              element={
                currentUser ? <Navigate to="/user/editinfo" /> : <LoginPage />
              }
            />
            <Route path="register" element={<RegisterPage />} />
            <Route path="lostpass" element={<LostPage />} />

            <Route path="editinfo" element={<UserEdit />}>
              <Route path="" element={<Navigate to="basic" replace={true} />} />
              {currentUser ? (
                <>
                  <Route path="basic" element={<Basic />} />
                  <Route path="avatar" element={<Avatar />} />
                  <Route path="email" element={<Email />} />
                  <Route path="password" element={<Password />} />
                  <Route path="question" element={<Question />} />
                  <Route path="two-step-veri" element={<TwoStepVeri />} />
                  <Route path="group" element={<Group />} />
                  <Route path="safe-mode" element={<SafeMode />} />
                </>
              ) : (
                <Route path="*" element={<Navigate to="/user/login" />} />
              )}
            </Route>
            <Route
              path=""
              element={currentUser ? <UserInfo /> : <LoginPage />}
            />
          </Route>

          <Route path="/two-step-verification" element={<StartVerify />} />
          <Route path="/two-step-verification/setup" element={<Setup />} />

          <Route path="/oganize" element={<Oganize />} />
          <Route path="/detailUser" element={<DetailUser />} />
          <Route path="/office" element={<Office />} />
          <Route path="/member" element={<Member />} />
          <Route
            path="/ban-chap-hanh-hiep-hoi"
            element={<ListOfExecutives />}
          />
          <Route path="/quyen-loi-hoi-vien" element={<MembershipBenefits />} />
          <Route path="/dang-ky-hoi-vien" element={<RegisterMember />} />
          <Route path="/member/:id" element={<MemberDetail />} />

          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:slug" element={<NewDetail />} />
          <Route path="/news/:slug/:subslug" element={<DetailPost />} />

          <Route path="/trade" element={<TradePage />} />
          <Route path="/trade/:slug" element={<DetailTrade />} />

          <Route path="/projects-page" element={<ProjectPage />} />
          <Route path="/projects-page/:slug" element={<DetailProjectPage />} />

          <Route path="/events-page" element={<PageEvents />} />
          <Route path="/events-page/:id" element={<EventsDetail />} />

          <Route path="/contact-page" element={<ContactPage />} />

          <Route path="/feedbackPage" element={<FeedbackPage />} />
          <Route path="/detailFeedback" element={<DetailFeedback />} />

          {/* <Route path="/page" element={<Page />} /> */}
          <Route path="/:slug" element={<ContentDetail />} />
        </Route>
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/feeds" element={<RssFeeds />} />
        <Route path="/feeds/:slug" element={<RssDetail />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/regulations" element={<Regulations />} />
        <Route path="/exCommittee" element={<ExCommittee />} />
        <Route path="/solution" element={<Solution />} />

        <Route path="/incorporation" element={<Incorporation />} />

        <Route path="/user" element={<UserAuth />}>
          <Route
            path="login"
            element={
              currentUser ? <Navigate to="/user/editinfo" /> : <LoginPage />
            }
          />
          <Route path="register" element={<RegisterPage />} />
          <Route path="lostpass" element={<LostPage />} />

          <Route path="editinfo" element={<UserEdit />}>
            <Route path="" element={<Navigate to="basic" replace={true} />} />
            {currentUser ? (
              <>
                <Route path="basic" element={<Basic />} />
                <Route path="avatar" element={<Avatar />} />
                <Route path="email" element={<Email />} />
                <Route path="password" element={<Password />} />
                <Route path="question" element={<Question />} />
                <Route path="two-step-veri" element={<TwoStepVeri />} />
                <Route path="group" element={<Group />} />
                <Route path="safe-mode" element={<SafeMode />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/user/login" />} />
            )}
          </Route>
          <Route path="" element={currentUser ? <UserInfo /> : <LoginPage />} />
        </Route>

        <Route path="/two-step-verification" element={<StartVerify />} />
        <Route path="/two-step-verification/setup" element={<Setup />} />

        <Route path="/oganize" element={<Oganize />} />
        <Route path="/detailUser" element={<DetailUser />} />
        <Route path="/office" element={<Office />} />
        <Route path="/member" element={<Member />} />
        <Route path="/ban-chap-hanh-hiep-hoi" element={<ListOfExecutives />} />
        <Route path="/quyen-loi-hoi-vien" element={<MembershipBenefits />} />
        <Route path="/dang-ky-hoi-vien" element={<RegisterMember />} />
        <Route path="/member/:id" element={<MemberDetail />} />

        <Route path="/search" element={<SearchPage />} />

        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:slug" element={<NewDetail />} />
        <Route path="/news/:slug/:subslug" element={<DetailPost />} />

        <Route path="/trade" element={<TradePage />} />
        <Route path="/trade/:slug" element={<DetailTrade />} />

        <Route path="/projects-page" element={<ProjectPage />} />
        <Route path="/projects-page/:slug" element={<DetailProjectPage />} />

        <Route path="/events-page" element={<PageEvents />} />
        <Route path="/events-page/:id" element={<EventsDetail />} />

        <Route path="/contact-page" element={<ContactPage />} />

        <Route path="/feedbackPage" element={<FeedbackPage />} />
        <Route path="/detailFeedback" element={<DetailFeedback />} />

        {/* <Route path="/page" element={<Page />} /> */}
        <Route path="/:slug" element={<ContentDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

function App() {
  const { currentUser } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <AppLayout currentUser={currentUser}>
        <Outlet />
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
