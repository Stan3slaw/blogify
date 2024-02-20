import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable('posts', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('content').notNullable();
      table.timestamps(true, true);
    })
    .then(async () => {
      await knex.raw(`
        CREATE OR REPLACE FUNCTION update_updated_at_posts()
        RETURNS TRIGGER AS $$
        BEGIN
          NEW.updated_at = NOW();
          RETURN NEW;
        END;
        $$ language 'plpgsql';
        
        CREATE OR REPLACE TRIGGER update_posts_updated_at
          BEFORE UPDATE
          ON posts
          FOR EACH ROW
        EXECUTE PROCEDURE update_updated_at_posts();
  `);
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP TRIGGER IF EXISTS update_posts_updated_at ON posts;');
  await knex.raw('DROP FUNCTION IF EXISTS update_updated_at_posts;');
  await knex.schema.dropTableIfExists('posts');
}
