"use client";
import { useTranslations } from "next-intl";
import SwithLanguage from "@/components/UI/SwithLanguage/SwithLanguage";

export default function HomeView():React.ReactElement{
  const translation = useTranslations("HomeView");
  return(
    <div>
      <h1>{translation("title")}</h1>
      <p>{translation("description")}</p>
      <SwithLanguage />
    </div>
  )
}