alter table "user" add column "name" text not null;

alter table "user" add column "email_verified" boolean not null;

alter table "user" add column "image" text;

create table "session" ("id" text not null primary key, "expires_at" timestamp not null, "token" text not null unique, "created_at" timestamp not null, "updated_at" timestamp not null, "ip_address" text, "user_agent" text, "user_id" text not null references "user" ("id"));

create table "account" ("id" text not null primary key, "account_id" text not null, "provider_id" text not null, "user_id" text not null references "user" ("id"), "access_token" text, "refresh_token" text, "id_token" text, "access_token_expires_at" timestamp, "scope" text, "password" text, "created_at" timestamp not null, "updated_at" timestamp not null);

create table "verification" ("id" text not null primary key, "identifier" text not null, "value" text not null, "expires_at" timestamp not null, "created_at" timestamp, "updated_at" timestamp);