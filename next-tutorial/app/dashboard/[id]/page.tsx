"use client";

export default function DashboardPageDetail({ params, searchParams }: any) {
  console.log(params);
  return (
    <main>
      Dashboard Detail {params.id} {searchParams.code}
    </main>
  );
}
