# Remocn typography backgrounds

`StaggeredFadeUp` renders an absolute full-frame wrapper and originally forced a white background. When using it inside dark slide shells, pass an explicit transparent background or the title becomes white-on-white inside the local title frame. This matters because Remocn registry components may be full-scene demos, not drop-in inline primitives.
