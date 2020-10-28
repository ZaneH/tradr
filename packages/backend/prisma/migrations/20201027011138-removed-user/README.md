# Migration `20201027011138-removed-user`

This migration has been generated by Zane Helton at 10/26/2020, 9:11:38 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Token" ADD COLUMN "symbol" text   NOT NULL 

CREATE UNIQUE INDEX "Token.symbol_unique" ON "public"."Token"("symbol")

DROP TABLE "public"."User"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201023122504-initial-migration..20201027011138-removed-user
--- datamodel.dml
+++ datamodel.dml
@@ -1,34 +1,39 @@
 datasource db {
     provider = "postgresql"
-    url = "***"
+    url = "***"
 }
 generator client {
     provider = "prisma-client-js"
 }
-model User {
-    id    String @id @default(uuid())
-    email String @unique
-}
-
+// The database will store the supported Tokens for easy lookup
 model Token {
     id       String @id @default(uuid())
     contract String @unique
+    symbol   String @unique
     aWatch Watcher[] @relation("fromToken")
     bWatch Watcher[] @relation("toToken")
 }
+// A Watcher is a task that watches the market
+// Currently it sells fromToken for toToken when the goal is met
+// TODO: Allow for a "grace period" before the trade to allow for an even better deal
+// TODO: Look at other currencies to see if there's a better trade (from a whitelist)
 model Watcher {
     id         String  @id @default(uuid())
+
+    // is the watcher watching
     isActive   Boolean @default(true)
+
+    // the amount of 'from' that you want to sell,
+    // for the amount of 'to' you want to get
     fromAmount Float
     toAmount   Float
     fromToken Token @relation(fields: [fromTokenId], references: [id], "fromToken")
     toToken   Token @relation(fields: [toTokenId], references: [id], "toToken")
-
     fromTokenId String
     toTokenId   String
 }
```

