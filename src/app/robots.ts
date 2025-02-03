import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api",
          "/reset-password",
          "/verify-email",
          "/confirm-email",
          "/forgot-password",
          "/logout",
          "/update-password",
          "/update-email",
          "/delete-account",
          "/delete-account-request",
          "/change-password",
          "/change-email",
          "/change-email-request",
          "/reset-password-request",
          "/verify-email-request",
          "/confirm-email-request",
          "/forgot-password-request",
          "/update-password-request",
          "/update-email-request",
        ],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
  };
}
