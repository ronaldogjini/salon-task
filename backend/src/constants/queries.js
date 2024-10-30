const SQL = {
  MONTHLY_RETENTION: `WITH ReferenceClients AS (
      SELECT 
          a.client_id,
          a.employee_id,
          MIN(date(a.date)) as first_visit_date,
          e.first_name || ' ' || e.last_name AS employee_name
      FROM APPOINTMENTS a
      JOIN EMPLOYEES e ON a.employee_id = e.employee_id
      WHERE strftime('%Y-%m', a.date) = ?
      GROUP BY a.client_id
  ),
  RetentionData AS (
          SELECT 
              rc.employee_id,
              rc.employee_name,
              rc.first_visit_date,
              strftime('%Y-%m', a.date) as retention_month,
              COUNT(DISTINCT a.client_id) as retained_count
          FROM ReferenceClients rc
          LEFT JOIN APPOINTMENTS a ON rc.client_id = a.client_id
          WHERE strftime('%Y-%m', a.date) > ?
          AND strftime('%Y-%m', a.date) <= ?
          GROUP BY 
              rc.employee_id,
              strftime('%Y-%m', a.date)
  )
  SELECT 
      rd.employee_id,
      rd.employee_name,
      strftime('%Y-%m', rd.first_visit_date) as reference_date,
      COUNT(DISTINCT rc.client_id) as reference_clients,
      rd.retention_month,
      CASE 
          WHEN COUNT(DISTINCT rc.client_id) > 0 
          THEN ROUND(CAST(rd.retained_count AS FLOAT) / COUNT(DISTINCT rc.client_id) * 100, 1)
          ELSE 0 
      END as retention_percentage,
      rd.retained_count as retained_clients
  FROM RetentionData rd
  JOIN ReferenceClients rc ON rd.employee_id = rc.employee_id
  GROUP BY 
      rd.employee_id,
      rd.retention_month
  ORDER BY 
      rd.employee_id,
      rd.retention_month;`
};

module.exports = SQL;
