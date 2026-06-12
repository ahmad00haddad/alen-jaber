
-- Dedupe by keeping the earliest row per natural key
DELETE FROM projects p USING projects p2 WHERE p.title = p2.title AND p.ctid > p2.ctid;
DELETE FROM testimonials t USING testimonials t2 WHERE t.name = t2.name AND t.quote = t2.quote AND t.ctid > t2.ctid;
DELETE FROM stats s USING stats s2 WHERE s.label = s2.label AND s.ctid > s2.ctid;
DELETE FROM process_steps p USING process_steps p2 WHERE p.title = p2.title AND p.ctid > p2.ctid;
DELETE FROM services s USING services s2 WHERE s.name = s2.name AND s.ctid > s2.ctid;
DELETE FROM marquee_words m USING marquee_words m2 WHERE m.word = m2.word AND m.ctid > m2.ctid;
DELETE FROM nav_links n USING nav_links n2 WHERE n.href = n2.href AND n.ctid > n2.ctid;
