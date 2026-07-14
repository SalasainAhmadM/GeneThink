/**
 * lib/utils.ts
 * cn() — NativeWind-safe className merger
 *
 * Usage:
 *   cn("base classes", condition && "extra class", condition ? "a" : "b")
 */

type ClassValue =
    | string
    | undefined
    | null
    | false
    | 0
    | ClassValue[];

/**
 * Joins truthy className strings, stripping px units for NativeWind.
 */
function cx(...inputs: ClassValue[]): string {
    const classes: string[] = [];

    for (const input of inputs) {
        if (!input) continue;
        if (typeof input === "string") {
            const stripped = input
                .split(" ")
                .filter(Boolean)
                .join(" ");
            if (stripped) classes.push(stripped);
        } else if (Array.isArray(input)) {
            const inner = cx(...input);
            if (inner) classes.push(inner);
        }
    }

    return classes.join(" ");
}

export { cx as cn };

