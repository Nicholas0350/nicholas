-- Extensions
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- nanoid function
CREATE OR REPLACE FUNCTION nanoid(size int DEFAULT 21)
RETURNS text AS $$
DECLARE
  id text := '';
  i int := 0;
  alphabet char(64) := '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';
  bytes bytea := gen_random_bytes(size);
  byte int;
BEGIN
  WHILE i < size LOOP
    byte := get_byte(bytes, i);
    id := id || substr(alphabet, (byte & 63) + 1, 1);
    i := i + 1;
  END LOOP;
  RETURN id;
END
$$ LANGUAGE plpgsql VOLATILE;

-- generate_inbox function
CREATE OR REPLACE FUNCTION generate_inbox(size int DEFAULT 10)
RETURNS text AS $$
BEGIN
  RETURN nanoid(size);
END
$$ LANGUAGE plpgsql VOLATILE;

-- extract_product_names function
CREATE OR REPLACE FUNCTION extract_product_names(products json)
RETURNS text AS $$
DECLARE
  result text := '';
BEGIN
  IF products IS NOT NULL THEN
    SELECT string_agg(p->>'name', ' ') INTO result
    FROM json_array_elements(products) AS p;
  END IF;
  RETURN COALESCE(result, '');
END
$$ LANGUAGE plpgsql IMMUTABLE;

-- generate_inbox_fts function
CREATE OR REPLACE FUNCTION generate_inbox_fts(display_name text, product_names text)
RETURNS tsvector AS $$
BEGIN
  RETURN to_tsvector('english', COALESCE(display_name, '') || ' ' || COALESCE(product_names, ''));
END
$$ LANGUAGE plpgsql IMMUTABLE;

-- Create private schema
CREATE SCHEMA IF NOT EXISTS private;

-- get_teams_for_authenticated_user function
CREATE OR REPLACE FUNCTION private.get_teams_for_authenticated_user()
RETURNS SETOF uuid AS $$
BEGIN
  RETURN QUERY
  SELECT team_id FROM users_on_team WHERE user_id = auth.uid();
END
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;
