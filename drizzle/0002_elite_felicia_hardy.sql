ALTER TABLE `ai_tools` ADD `logo` text;--> statement-breakpoint
ALTER TABLE `ai_tools` ADD `short_description` text;--> statement-breakpoint
ALTER TABLE `ai_tools` ADD `full_description` text;--> statement-breakpoint
ALTER TABLE `ai_tools` ADD `pricing_type` text DEFAULT 'freemium' NOT NULL;--> statement-breakpoint
ALTER TABLE `ai_tools` ADD `starting_price` text;--> statement-breakpoint
ALTER TABLE `ai_tools` ADD `best_for` text;--> statement-breakpoint
ALTER TABLE `ai_tools` ADD `pros` text;--> statement-breakpoint
ALTER TABLE `ai_tools` ADD `cons` text;--> statement-breakpoint
ALTER TABLE `ai_tools` ADD `ease_of_use_score` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `ai_tools` ADD `pricing_value_score` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `ai_tools` ADD `features_score` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `ai_tools` ADD `developer_usefulness_score` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `ai_tools` ADD `overall_score` integer DEFAULT 0 NOT NULL;