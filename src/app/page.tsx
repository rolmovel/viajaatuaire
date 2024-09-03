import Image from "next/image";
import Landing from "@/components/landing"
import getPostMetadata from "../components/getPostMetadata";
import PostMetadata from "../components/PostMetadata";
import { ApplicationLogger, LoggerFunction, LoggerLevel, Logger } from 'simple-logging-system';

export default function Home() {

    const postMetadata:PostMetadata[] = getPostMetadata();

    return (
      <Landing posts={postMetadata}/>
    );
}
