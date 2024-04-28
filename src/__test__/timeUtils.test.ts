import { roundedToNearestMinute, fromHmmToDate } from "../utils/timeUtils";
import { describe, it, expect } from "@jest/globals";
// import type { TimeLog } from "..//server/types";

describe("time utility functions", () => {
  describe("roundedToNearestMinute", () => {
    it("should round down to the nearest minute", () => {
      const date = new Date("2024-04-25T09:30:29.500");
      const roundedDate = roundedToNearestMinute(date);
      expect(roundedDate).toEqual(new Date("2024-04-25T09:30:00.000"));
    });

    it("should round up to the nearest minute", () => {
      const date = new Date("2024-04-25T09:30:30.500");
      const roundedDate = roundedToNearestMinute(date);
      expect(roundedDate).toEqual(new Date("2024-04-25T09:31:00.000"));
    });

    it("should handle edge case when seconds and milliseconds are already zero", () => {
      const date = new Date("2024-04-25T09:30:00.000");
      const roundedDate = roundedToNearestMinute(date);
      expect(roundedDate).toEqual(new Date("2024-04-25T09:30:00.000"));
    });
  });
  describe("fromHmmToDate", () => {
    it("should convert HHmm string to Date correctly", () => {
      const baseDate = new Date("2024-04-25T00:00:00");
      expect(fromHmmToDate("0900", baseDate)).toEqual(
        new Date("2024-04-25T09:00:00"),
      );
      expect(fromHmmToDate("1530", baseDate)).toEqual(
        new Date("2024-04-25T15:30:00"),
      );
    });

    it("should handle edge cases correctly", () => {
      const baseDate = new Date("2024-04-25T00:00:00");

      // Test minimum valid time (00:00)
      expect(fromHmmToDate("0000", baseDate)).toEqual(
        new Date("2024-04-25T00:00:00"),
      );

      // Test maximum valid time (23:59)
      expect(fromHmmToDate("2359", baseDate)).toEqual(
        new Date("2024-04-25T23:59:00"),
      );

      // Test single-digit hour and minute
      expect(fromHmmToDate("0105", baseDate)).toEqual(
        new Date("2024-04-25T01:05:00"),
      );

      // Test leading zero for single-digit hour
      expect(fromHmmToDate("0015", baseDate)).toEqual(
        new Date("2024-04-25T00:15:00"),
      );
    });

    it("should handle invalid input gracefully", () => {
      const baseDate = new Date("2024-04-25T00:00:00");

      // Test invalid hour (greater than 23)
      expect(fromHmmToDate("2400", baseDate)).not.toEqual(
        new Date("2024-04-25T00:00:00"),
      );

      // Test invalid minute (greater than 59)
      expect(fromHmmToDate("1060", baseDate)).not.toEqual(
        new Date("2024-04-25T10:00:00"),
      );

      // Test invalid format (non-numeric characters)
      expect(fromHmmToDate("09:00", baseDate)).not.toEqual(
        new Date("2024-04-25T00:00:00"),
      );
    });
  });
});
