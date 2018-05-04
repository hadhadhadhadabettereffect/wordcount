declare const enum ChangeType {
    input,
    count,
    rtl,

    input_mask = 1 << input,
    count_mask = 1 << count,
    rtl_mask = 1 << rtl
}