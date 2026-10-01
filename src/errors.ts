// m-one-emi-shared/src/errors.ts

/**
 * Stable machine-readable error codes. Clients branch on these and ONLY these —
 * never on HTTP status alone, never on message text.
 *
 * MIRRORED VERBATIM from m-one-emi-server/src/common/errors.ts.
 * The server is the source of truth; keep this union byte-identical.
 */
export const ERROR_CODES = [
  "VALIDATION_FAILED",
  "UNAUTHENTICATED",
  "FORBIDDEN",
  "NOT_FOUND",
  "CONFLICT",
  "RATE_LIMITED",
  "INTERNAL",
  "UPSTREAM_UNAVAILABLE",
  "DEVICE_OFFLINE",
  "COMMAND_EXPIRED",
  "ENROLLMENT_INVALID",
  "ENROLLMENT_CONSUMED",
  "CONSENT_REQUIRED",
  "EMAIL_NOT_VERIFIED",
  "OTP_INVALID",
  "OTP_EXPIRED",
  "OTP_ATTEMPTS_EXCEEDED",
  "DEVICE_NOT_OWNER",
  "GEOFENCE_UNDEFINED",
  "UNSUPPORTED_MEDIA_TYPE",
  "FILE_TOO_LARGE",
  "UPDATE_REQUIRED",
  "CHECKSUM_MISMATCH",
  "DUPLICATE_SUBMISSION",
  "STALE_WRITE",
  "POSSIBLE_DUPLICATE",
  "MQTT_UNAVAILABLE",
] as const;

export type ErrorCode = (typeof ERROR_CODES)[number];

/** Field-level validation detail. Matches server ZodValidationPipe output. */
export interface ErrorDetail {
  field: string;
  issue: string;
}

/**
 * Canonical error envelope. Matches AllExceptionsFilter exactly:
 * the `details` key is always present on the wire (value may be undefined).
 * Success responses never carry an `error` key.
 */
export interface ErrorEnvelope {
  error: {
    code: ErrorCode;
    message: string;
    details?: ErrorDetail[];
    requestId: string;
    timestamp: string; // ISO 8601 (server: new Date().toISOString())
  };
}

/** Runtime guard — use on any non-2xx response body before reading `.error.code`. */
export function isErrorEnvelope(value: unknown): value is ErrorEnvelope {
  if (typeof value !== "object" || value === null) return false;
  const e = (value as Record<string, unknown>).error;
  if (typeof e !== "object" || e === null) return false;
  const err = e as Record<string, unknown>;
  return (
    typeof err.code === "string" &&
    typeof err.message === "string" &&
    typeof err.requestId === "string" &&
    typeof err.timestamp === "string"
  );
}

/** Narrowing helper: true when the envelope carries a specific code. */
export function hasErrorCode(value: unknown, code: ErrorCode): boolean {
  return isErrorEnvelope(value) && value.error.code === code;
}

/** O(1) membership check / validate an unknown string against the union. */
export const ERROR_CODE_SET: ReadonlySet<string> = new Set(ERROR_CODES);

export function isKnownErrorCode(code: string): code is ErrorCode {
  return ERROR_CODE_SET.has(code);
}

/**
 * HTTP status mapping the server uses (from http-exception.filter.ts), for
 * clients that want a sensible default status per code. Not authoritative —
 * always branch on `code`, not status. AppError instances carry their own
 * httpStatus server-side; these are the common defaults.
 */
export const DEFAULT_HTTP_STATUS: Partial<Record<ErrorCode, number>> = {
  VALIDATION_FAILED: 400,
  UNAUTHENTICATED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  STALE_WRITE: 409,
  DUPLICATE_SUBMISSION: 409,
  POSSIBLE_DUPLICATE: 409,
  OTP_ATTEMPTS_EXCEEDED: 429,
  RATE_LIMITED: 429,
  UNSUPPORTED_MEDIA_TYPE: 415,
  FILE_TOO_LARGE: 413,
  INTERNAL: 500,
  UPSTREAM_UNAVAILABLE: 503,
  MQTT_UNAVAILABLE: 503,
};
