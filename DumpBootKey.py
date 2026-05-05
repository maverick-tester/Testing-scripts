import winreg

def get_boot_key():
    base_path = r"SYSTEM\CurrentControlSet\Control\Lsa"
    keys = ["JD", "Skew1", "GBG", "Data"]
    scrambled_hex = ""

    try:
        for key_name in keys:
            path = f"{base_path}\\{key_name}"
            # Open the key with Read rights
            with winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, path, 0, winreg.KEY_READ) as hkey:
                # QueryInfoKey returns (class_name, num_subkeys, last_modified)
                # The 'Class' string is at index 0
                info = winreg.QueryInfoKey(hkey)
                class_name = info[0]
                scrambled_hex += class_name

        # Convert hex string to byte array
        boot_key_bytes = bytes.fromhex(scrambled_hex)
        
        # The specific Syskey permutation map from your C script
        transforms = [8, 5, 4, 2, 11, 9, 13, 3, 0, 6, 1, 12, 14, 10, 15, 7]
        
        final_key = bytearray(16)
        for i in range(16):
            final_key[i] = boot_key_bytes[transforms[i]]
            
        return final_key.hex()
        
    except PermissionError:
        return "Error: Access Denied. You must run this terminal as Administrator."
    except Exception as e:
        return f"Error: {str(e)}"

print(f"Boot key is: {get_boot_key()}")
