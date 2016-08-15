package com.yapovich.cjzs.util;


/**
 * Created by yebo on 2016/8/15.
 */
public class FormatChecker {
    /**
     * 根据输入的ISBN号，检验ISBN的有效性。依据 GB/T 5795-2006 和 ISO 2108:2005 ISBN
     * 10位标准和13位标准实现（13位标准自2007年1月1日开始实行，在此之前采用10位标准）。
     *
     * @param isbn：需要进行校验的ISBN字符串
     * @return true：所输入的ISBN校验正确；<br/> false：所输入的ISBN校验错误
     */
    public static boolean checkISBN(String isbn) {
        int count = 0;
        int checkBitInt = 0;
        // 将ISBN数据全取大写字母
        //isbn = isbn.toUpperCase();

        char[] cs = isbn.toCharArray();
        switch (isbn.length()) {
            case 10:
                // ****************************************************************
                // 当ISBN为10位时，进行的校验，用于2007年1月1日前的出版物
                // 数据格式：从左至右前9位为ISBN数据，第10位为校验位
                // 校验方法：
                // (1) 从左至右将前9位数据从10开始至2进行编号，作为位权
                // (2) 将9位数据与各位位权进行加权，并求其9位和（称为加权和，记作M）
                // (3) 第10位校验位计算方法，校验位为C：
                //         M + C ≡ 0 (mod 11)
                //  C为10时，记作“X”
                // ****************************************************************
                // 取出前9位数字进行加权和计算
                for (int i = 0; i < 9; i++) {
                    // 若前9位数据中有非数字字符，则抛出异常
                    if (cs[i] < '0' || cs[i] > '9') {
                        return false;
                    }

                    int c = cs[i] - '0';
                    // 求加权和
                    count += c * (10 - i);
                }
                // 取出校验位数据0～9和X符合校验字符要求
                if (cs[9] >= '0' && cs[9] <= '9') {
                    checkBitInt = cs[9] - '0';
                } else if (cs[9] == 'X' || cs[9] == 'x') {
                    // 校验位中的“X”表示数据“10”
                    checkBitInt = 10;
                } else {
                    // 非0～9或X时抛出异常
                    return false;
                }
                // 进行校验
                if ((count + checkBitInt) % 11 == 0) {
                    return true; // 校验成功
                } else {
                    return false; // 校验失败
                }
            case 13:
                // ****************************************************************
                // 当ISBN为13位时，进行的校验，用于2007年1月1日后的出版物
                // 数据格式：从左至右前12位为ISBN数据，第13位为校验位
                // 校验方法：
                // (1) 从左至右将前12位数的取其奇位数和和偶位数和
                // (2) 将偶位数和乘3，并其与奇位数和的和，得加权和
                // (3) 第13位校验位计算方法，校验位为C：
                //         M + C ≡ 0 (mod 10)
                // ****************************************************************
                // ISBN为13位数据时，前3位目前只能是“978”（已实行）或“979”（暂未实行）
                if (!isbn.startsWith("978") && !isbn.startsWith("979")) {
                    return false;
                }
                // 取出前12位数字进行加权和计算
                int countEven = 0;
                int countOdd = 0;
                for (int i = 0; i < 12; i++) {
                    int c = cs[i] - '0';
                    // 若前12位数据中有非数字字符，则抛出异常
                    if (c < 0 || c > 9) {
                        return false;
                    }
                    // 分别计算奇位数和偶位数的和
                    if ((i & 0x1) == 0) {
                        countOdd += c;
                    } else {
                        countEven += c;
                    }
                }
                // 求加权和
                count = countOdd + (countEven * 3);
                // 取出校验位数据
                if (cs[12] < '0' || cs[12] > '9') {
                    // 校验位为非0~9字符时，抛出异常
                    return false;
                }
                checkBitInt = cs[12] - '0';
                // 进行校验
                if ((count + checkBitInt) % 10 == 0) {
                    return true; // 校验成功
                } else {
                    return false; // 校验失败
                }
            default:
                // ISBN为非10位或13位时抛出异常
                return false;
        }
    }
}
