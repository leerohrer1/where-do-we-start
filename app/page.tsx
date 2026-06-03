import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Where do we start?
      </h1>
      <p className="mb-4">
        &quot;Embarrassment is the cost of entry; if you aren&apos;t willing to
        look like a foolish beginner, you will never become a graceful
        master.&quot; - Ed Latimore
      </p>
      <p className="mb-4">
        Hi, my name is Lee Rohrer. I'm a software engineer, a runner, a doodler, and 
        someone who likes to learn new things. But it didn't start that way.
      </p>
      <p className="mb-4">
        As a kid and as a teenager, I didn&apos;t have hobbies and I only did things
        I felt immediately good at. That meant I spent a lot of time
        watching Rosie O&apos;Donnell and Boy Meets World (you may have to ask chat about those, my young visitors). 
      </p>
      <p className="mb-4">
        As an adult, that meant I was bad at a lot of stuff. Now, I enjoy learning
        and getting better, even if it means looking foolish. I want to help other
        people do that, too. We can&apos;t always know where to start, so let&apos;s
        talk about it.
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
