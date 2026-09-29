import {notFound} from "next/navigation";import BlogDetail from "../../../components/BlogDetail/BlogDetail";import Footer from "../../../components/Footer/Footer";import Header from "../../../components/Header/Header";import {blogPosts} from "../../../data/blogPosts";
export function generateStaticParams(){return blogPosts.map(post=>({slug:post.slug}))}
export default async function Page({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const post=blogPosts.find(item=>item.slug===slug);if(!post)notFound();return <><Header/><BlogDetail post={post}/><Footer/></>}
