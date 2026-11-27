# AgilFrame repositories

[Русский](repositories.md) · **English**

The umbrella repository pins a compatible set of component versions. Core contains the server and the full integration workspace. You can build the Web SDK, mobile SDKs, and media node components from their own repositories. Edge also has a separate repository. Publishing media from Edge requires a running Core instance and a configured LiveKit Ingress. [Edge setup](https://github.com/GillHD/agilframe-edge/blob/main/README.en.md)

## Update component versions

Web SDK, Mobile, Nodes, and Edge are maintained in their own repositories. Core owns the protocol contracts and shared administration components. The Core integration workspace includes copies of the SDK, mobile, and node components so it can build independently. The Web SDK also includes copies of the Core components it uses. The end-to-end test runs Edge from its own repository.

1. Publish changes in the repository that owns the source. Update copies of the affected files in dependent repositories.
2. When updating Core, set `AGILFRAME_REF` to the same commit SHA in `deploy/.env.example` and in the default value in `deploy/compose.yaml`.
3. Update the Git submodule references and release manifest in the same commit. In an existing clone, run `git submodule update --init --recursive` to check out the pinned revisions. [Release manifest](../versions.json)
4. Run `node scripts/verify-release.mjs` from the repository root. It checks the manifest against the submodule revisions, the Deploy defaults, and the tracked files shared by components. The integration workflow verifies that the widget can join a call, Node Agent can register, and Edge can publish media through LiveKit. [Integration workflow](../.github/workflows/verify-components.yml)
