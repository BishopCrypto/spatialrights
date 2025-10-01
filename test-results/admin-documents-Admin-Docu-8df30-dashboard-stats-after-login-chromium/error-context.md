# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e5]:
    - generic [ref=e6]:
      - generic [ref=e7]:
        - img [ref=e8]
        - generic [ref=e12]: Nomic Venture Studio
      - generic [ref=e13]: Sign In
      - generic [ref=e14]: Enter your credentials to access your ventures
    - generic [ref=e15]:
      - generic [ref=e16]:
        - generic [ref=e17]:
          - generic [ref=e18]: Email
          - textbox "Email" [ref=e19]
        - generic [ref=e20]:
          - generic [ref=e21]: Password
          - textbox "Password" [ref=e22]
        - button "Sign In" [ref=e23]
      - generic [ref=e24]:
        - link "Forgot your password?" [ref=e26] [cursor=pointer]:
          - /url: /auth/reset-password
        - generic [ref=e27]:
          - text: Don't have an account?
          - link "Sign up" [ref=e28] [cursor=pointer]:
            - /url: /auth/signup
  - button "Open Next.js Dev Tools" [ref=e34] [cursor=pointer]:
    - img [ref=e35] [cursor=pointer]
  - alert [ref=e38]
```