import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <p className={styles.kicker}>DevEntro MVP</p>
        <h1>Project setup complete.</h1>
        <p>
          The Next.js App Router foundation is ready. Tailwind and Shadcn setup
          come next.
        </p>
      </main>
    </div>
  );
}
