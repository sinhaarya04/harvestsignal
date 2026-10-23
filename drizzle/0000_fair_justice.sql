CREATE TABLE `campaigns` (
	`id` text PRIMARY KEY NOT NULL,
	`forecast_id` text NOT NULL,
	`market` text NOT NULL,
	`language` text NOT NULL,
	`message` text NOT NULL,
	`segments` integer NOT NULL,
	`fingerprint` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `campaign_fingerprint` ON `campaigns` (`fingerprint`);--> statement-breakpoint
CREATE TABLE `deliveries` (
	`id` text PRIMARY KEY NOT NULL,
	`campaign_id` text NOT NULL,
	`farmer_id` text NOT NULL,
	`status` text NOT NULL,
	`attempts` integer NOT NULL,
	`error` text,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `deliveries_campaign` ON `deliveries` (`campaign_id`);--> statement-breakpoint
CREATE TABLE `farmers` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`village` text NOT NULL,
	`phone` text NOT NULL,
	`market` text NOT NULL,
	`language` text NOT NULL,
	`consent` integer NOT NULL,
	`active` integer NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `feedback` (
	`id` text PRIMARY KEY NOT NULL,
	`farmer_id` text NOT NULL,
	`sale_price` real NOT NULL,
	`quantity` real NOT NULL,
	`sale_date` text NOT NULL,
	`rating` integer NOT NULL,
	`channel` text NOT NULL,
	`note` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `forecasts` (
	`id` text PRIMARY KEY NOT NULL,
	`market` text NOT NULL,
	`data` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `meta` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `prices` (
	`id` text PRIMARY KEY NOT NULL,
	`market` text NOT NULL,
	`date` text NOT NULL,
	`price` real NOT NULL,
	`source` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `prices_market_date` ON `prices` (`market`,`date`);