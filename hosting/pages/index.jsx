import Link from "next/link";

export default function IndexPage() {
  return (
    <div>
      Hello World. <Link href="/about">About</Link>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}
