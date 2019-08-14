import React from "react"
import CMS from "netlify-cms"
import "./cms-utils"

import HomePageTemplate from "../templates/HomePage"
import SolutionCategoryPageTemplate from "../templates/SolutionCategoryPage"
import SolutionPageTemplate from "../templates/SolutionPage"
import AboutPageTemplate from "../templates/AboutPage"
import DefaultPageTemplate from "../templates/DefaultPage"
import PostCategoryPageTemplate from "../templates/PostCategoryPage"
import PostPageTemplate from "../templates/PostPage"
import ClientPageTemplate from "../templates/ClientPage"

if (
  window.location.hostname === "localhost" &&
  window.localStorage.getItem("netlifySiteURL")
) {
  CMS.registerPreviewStyle(
    window.localStorage.getItem("netlifySiteURL") + "/styles.css"
  )
} else {
  CMS.registerPreviewStyle("/styles.css")
}

CMS.registerPreviewTemplate("home-page", ({ entry }) => (
  <HomePageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate("clients-page", ({ entry }) => (
  <ClientPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate("about-page", ({ entry }) => (
  <AboutPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate("blog-page", ({ entry }) => (
  <PostCategoryPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate("solution-category-page", ({ entry }) => (
  <SolutionCategoryPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate("posts", ({ entry }) => (
  <PostPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate("solutions", ({ entry }) => (
  <SolutionPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate("info", ({ entry }) => (
  <DefaultPageTemplate {...entry.toJS().data} />
))
