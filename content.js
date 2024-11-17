const IG_LINK = "https://instagram.com/yourusername";

function updateTextField(event) {
    const field = event.target;
    const value = field.value;
    if (value.includes('/IG')) {
        field.value = value.replace('/IG', IG_LINK);
    }
}

function monitorAllFields(root) {
    if (!root) return;
    root.querySelectorAll('input, textarea').forEach((field) => {
        field.addEventListener('input', updateTextField);
    });
}

function monitorDynamicContent() {
    new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { 
                    monitorAllFields(node);
                    if (node.tagName === 'IFRAME') {
                        try {
                            monitorAllFields(node.contentDocument.body);
                        } catch (e) {
                            console.error('Error accessing iframe:', e);
                        }
                    }
                }
            });
        });
    }).observe(document.body, { childList: true, subtree: true });
}

monitorAllFields(document);
monitorDynamicContent();
