## Data Sanitization

- Data sanitization is typically applied in POST, PATCH, and PUT requests.

- If extra or unexpected keys are sent. For example via postman — they may be silently ignored.

- To prevent this, it’s important to implement API‑level validation so only the intended fields are accepted and processed.
