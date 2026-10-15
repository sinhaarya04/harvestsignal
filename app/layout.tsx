import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "HarvestSignal | Field Operations", description: "Crop price forecasts, farmer outreach and feedback. Interactive research demonstration.", icons: {icon:"/favicon.svg"} };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
