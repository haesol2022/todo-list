📝 Todo List App

Next.js(App Router)를 기반으로 한 Todo 관리 웹 애플리케이션입니다.
할 일의 상태(TODO / DONE)를 한눈에 확인하고, 상세 페이지에서 할 일의 정보를 관리할 수 있습니다.

🔗 Demo

Deployment:
👉 https://YOUR-VERCEL-URL.vercel.app

GitHub Repository:
👉 https://github.com/haesol2022/YOUR-REPO-NAME

✨ Features
📌 Todo List

TODO / DONE 상태별 할 일 목록 분리

할 일이 없는 경우 안내 문구 표시

TODO:

할 일이 없어요. TODO를 새롭게 추가해주세요!

DONE:

아직 다 한 일이 없어요. 해야 할 일을 체크해보세요!

체크박스를 통한 할 일 완료 처리

📄 Todo Detail Page

할 일 클릭 시 상세 페이지(/items/[itemId]) 이동

할 일 제목, 메모, 이미지 미리보기 표시

이미지가 없는 경우 기본 이미지 표시

🧭 Navigation

상단 로고 클릭 시 / 페이지로 이동 (새로고침 포함)

🖼 Image Handling

next/image 사용

외부 이미지(S3) 사용을 위한 next.config.js 설정

🛠 Tech Stack

Framework: Next.js 14 (App Router)

Language: TypeScript

Styling: Tailwind CSS

Image Optimization: next/image

Deployment: Vercel
