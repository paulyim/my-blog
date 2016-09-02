{:title "Cryogen文档-Markdown或者AsciDoc格式切换"
:layout :post
:tags  ["cryogen"]}

Cryogen 支持 Markdown/AsciiDoc 两种格式编写内容，你只能选择其中之一，默认使用 Markdown。

如果你想使用 AsciiDoc 格式，你可以将 `project.clj` 文件中的 `:dependencies` 的值从 `cryogen-markdown` 更改为 `cryogen-asciidoc`。相应的，编译器会从 `templates/md` 目录寻找 `.md` 文件切换到从 `templates/asc` 目录寻找 `.asc`　文件进行编译。
