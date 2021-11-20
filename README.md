<p align="center">
  <a href="https://github.com/fatelei/github-notify-actions/actions"><img alt="typescript-action status" src="https://github.com/fatelei/github-notify-actions/workflows/build-test/badge.svg"></a>
</p>

# Github notify actions

Integrate with: lark, wecom, slack webhooks.

# Usage

```yaml
- name: github-notify-action
  # You may pin to the exact commit or the version.
  # uses: fatelei/github-notify-actions@5d5cc6b74d5c8e90ce3ac473ad7ddfb2fee5b350
  uses: fatelei/github-notify-actions@v0.0.3
  with:
    # support lark / wecom / slack
    integration: 
    # webhook url
    webhook: 
    # message type, current only support text
    messageType: 
    # content
    content: 
    # title
    title: # optional, default is 
```