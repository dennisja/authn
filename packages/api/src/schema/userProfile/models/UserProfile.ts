import { schemaBuilder } from "../../builder";

schemaBuilder.prismaObject("UserProfile", {
  fields: (t) => ({
    id: t.exposeID("id"),
    firstName: t.exposeString("firstName"),
    lastName: t.exposeString("lastName"),
    otherNames: t.exposeString("otherNames", { nullable: true }),
    profileImageURL: t.exposeString("profileImageUrl", { nullable: true }),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime", nullable: true }),
    birthDay: t.expose("birthday", { type: "Date", nullable: true }),
    owner: t.relation("user"),
  }),
});
