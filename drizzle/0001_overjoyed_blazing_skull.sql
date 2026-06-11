ALTER TABLE `posts` ADD `content_html` text;--> statement-breakpoint
ALTER TABLE `posts` ADD `content_format` text DEFAULT 'markdown' NOT NULL;