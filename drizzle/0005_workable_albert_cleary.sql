ALTER TABLE "devlivery_persons" RENAME TO "delivery_persons";--> statement-breakpoint
ALTER TABLE "delivery_persons" DROP CONSTRAINT "devlivery_persons_warehouse_id_warehouses_id_fk";
--> statement-breakpoint
ALTER TABLE "delivery_persons" DROP CONSTRAINT "devlivery_persons_order_id_orders_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "delivery_persons" ADD CONSTRAINT "delivery_persons_warehouse_id_warehouses_id_fk" FOREIGN KEY ("warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "delivery_persons" ADD CONSTRAINT "delivery_persons_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
