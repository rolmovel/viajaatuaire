import Link from "next/link"
import getPostMetadata from "@/components/getPostMetadata";
import PostMetadata from "@/components/PostMetadata";
import { Logger } from 'simple-logging-system';
import React from 'react'
import {createRoot} from 'react-dom/client'
import Markdown from 'react-markdown'

export default function About({ params }: { params: { slug: string } }) {
  const logger= new Logger("About")
  const content = getPostMetadata().filter(page => page.key == params.slug).map(
      (post, index) => post.content)

  return (

    <div className="flex flex-col min-h-[100dvh]">
      <header className="bg-[#FFC107] text-[#333] px-4 lg:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <PlaneIcon className="h-6 w-6" />
          <span className="text-xl font-bold">Viaja a tu aire</span>
        </Link>
      </header>

      <main className="flex-1">
        <section id="funciona" className="py-12 md:py-24 lg:py-32 bg-[#F5F5F5]">
          <div className="container mx-auto px-4 md:px-6 grid gap-12">
             <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div dangerouslySetInnerHTML={{__html: content}} />
             </div>
           </div>
         </section>

      </main>
    </div>
  );
}


function PlaneIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  )
}

