CREATE TABLE `media_assets` (
	`id` text PRIMARY KEY NOT NULL,
	`url` text NOT NULL,
	`key` text NOT NULL,
	`filename` text NOT NULL,
	`alt_text` text,
	`size` integer NOT NULL,
	`type` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `media_assets_key_unique` ON `media_assets` (`key`);--> statement-breakpoint
CREATE INDEX `media_assets_key_idx` ON `media_assets` (`key`);