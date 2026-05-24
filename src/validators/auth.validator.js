const z = require("zod");

const registerSchema = z
  .object({
    name: z
      .string()
      .min(6, "O nome de usuário deve ter pelo menos 6 caracteres"),
    email: z.string().email(),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres"),
    acceptedTerms: z.literal(true, {
      message: "É necessário aceitar os termos para criar a conta.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem.",
    path: ["confirmPassword"],
  });

const loginSchema = z.object({
  employeeCode: z.string().regex(/^C\d+$/, "Código inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

const passwordRecoverySchema = z
  .object({
    employeeCode: z.string().regex(/^C\d+$/, "Código inválido"),
    newPassword: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmNewPassword: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "As senhas não conferem.",
    path: ["confirmNewPassword"],
  });

module.exports = {
  registerSchema,
  loginSchema,
  passwordRecoverySchema,
};
